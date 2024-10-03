import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const plans = [
    { name: 'Basic', price: '$9.99/month', features: ['Schedule up to 5 tee times', 'Access to 10 courses', 'Basic analytics'] },
    { name: 'Pro', price: '$19.99/month', features: ['Unlimited tee times', 'Access to all courses', 'Advanced analytics', 'Priority support'] },
    { name: 'Enterprise', price: 'Custom', features: ['All Pro features', 'Custom integrations', 'Dedicated account manager'] },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-800">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">{plan.price}</p>
              <ul className="list-disc list-inside mb-4">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Button className="w-full">Choose Plan</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;