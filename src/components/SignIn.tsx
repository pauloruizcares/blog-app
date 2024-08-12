import { Avatar, Dropdown, Space } from "antd";
import { useUserSession } from "../hooks/useUserSession";
import { useLogout } from "../hooks/useLogout";
import { ItemType, MenuItemType } from "antd/es/menu/interface";

const SignIn: React.FC = () => {
    const { data, refetch } = useUserSession()
    const { mutate } = useLogout()

    const handlerLogout = () => {
        mutate();
        refetch();
    }

    const items: ItemType<MenuItemType>[] = [
        { key: 'logout', title: 'Logout', onClick: handlerLogout, label: 'Logout' },
    ];

    return (
        <div>
            {data?.authenticated ? (
                <div className="user-info">
                    <Dropdown menu={{
                        items: items
                    }} trigger={['click']}>
                        <Space>
                            <Avatar src={data.user.photoURL} />
                            <span>{data.user.displayName}</span>
                        </Space>
                    </Dropdown>
                </div>
            ) : (
                <a href="http://localhost:4000/api/auth/google/">SignIn</a>
            )}
        </div>
    );
}

export default SignIn;