import React from 'react';
import './Home.scss';
import FeatureCard from "../components/FeatureCard";

export const Home: React.FC = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>Welcome to Our Blog</h1>
                <p>Discover amazing articles, insights, and resources</p>
            </div>
            <div className="features-section">
                <FeatureCard
                    title="Latest Articles"
                    description="Stay updated with the latest trends and topics in our field. Read in-depth articles and insights from industry experts."
                />
                <FeatureCard
                    title="Categories"
                    description="Explore our diverse range of categories, from technology and design to lifestyle and personal development."
                />
                <FeatureCard
                    title="Community"
                    description="Join our vibrant community of readers and contributors. Share your thoughts, engage in discussions, and connect with like-minded individuals."
                />
            </div>
        </div>
    );
};

export default Home;
