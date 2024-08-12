// src/components/FeatureCard.tsx
import React from 'react';
import { Card } from 'antd';
import './FeatureCard.scss';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <Card className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  );
};

export default FeatureCard;
