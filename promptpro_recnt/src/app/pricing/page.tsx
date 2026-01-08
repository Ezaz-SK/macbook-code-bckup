"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { 
  CheckCircle, 
  Star, 
  Zap, 
  Users, 
  Crown,
  ArrowRight,
  HelpCircle,
  CreditCard
} from "lucide-react"

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Free",
      description: "Perfect for individuals getting started",
      price: isAnnual ? 0 : 0,
      annualPrice: 0,
      monthlyPrice: 0,
      icon: Star,
      features: [
        "15 prompts per month",
        "Basic modes (Academic, Developer, Creative)",
        "Personal workspace",
        "Basic analytics",
        "Community support",
        "Mobile app access"
      ],
      limitations: [
        "No team collaboration",
        "Limited storage",
        "Basic templates only"
      ],
      popular: false,
      cta: "Get Started",
      color: "border-gray-200"
    },
    {
      name: "Pro",
      description: "For professionals and power users",
      price: isAnnual ? 190 : 19,
      annualPrice: 190,
      monthlyPrice: 19,
      icon: Zap,
      features: [
        "Unlimited prompts",
        "All modes & features",
        "Advanced AI suggestions",
        "Priority processing",
        "Advanced analytics",
        "Custom templates",
        "API access",
        "Email support"
      ],
      limitations: [],
      popular: true,
      cta: "Start Free Trial",
      color: "border-primary"
    },
    {
      name: "Team",
      description: "For growing teams and organizations",
      price: isAnnual ? 490 : 49,
      annualPrice: 490,
      monthlyPrice: 49,
      icon: Users,
      features: [
        "Everything in Pro",
        "5 team members included",
        "Real-time collaboration",
        "Team workspaces",
        "Admin controls",
        "Priority support",
        "Custom integrations",
        "SSO (coming soon)",
        "Advanced security"
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales",
      color: "border-gray-200"
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom needs",
      price: null,
      annualPrice: null,
      monthlyPrice: null,
      icon: Crown,
      features: [
        "Everything in Team",
        "Unlimited team members",
        "Custom AI models",
        "Dedicated account manager",
        "SLA guarantee",
        "On-premise deployment option",
        "Custom training",
        "Advanced security & compliance",
        "24/7 phone support"
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales",
      color: "border-gray-200"
    }
  ]

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "What happens if I exceed my prompt limit?",
      answer: "Free plan users will be limited to 15 prompts per month. Pro and Team plans have unlimited prompts."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period."
    },
    {
      question: "Do you offer educational discounts?",
      answer: "Yes, we offer special pricing for students and educational institutions. Contact our sales team for more information."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use industry-standard encryption and security practices to protect your data."
    }
  ]

  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your needs. Start free and scale as you grow.
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm ${!isAnnual ? 'font-medium' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <span className={`text-sm ${isAnnual ? 'font-medium' : 'text-muted-foreground'}`}>
            Annual
          </span>
          <Badge variant="secondary" className="ml-2">
            Save 20%
          </Badge>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="grid gap-6 lg:grid-cols-4">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : plan.color}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              </div>
            )}
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <plan.icon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                {plan.price !== null ? (
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">
                      /{isAnnual ? 'month' : 'month'}
                    </span>
                  </div>
                ) : (
                  <div className="text-2xl font-bold">Custom</div>
                )}
                {isAnnual && plan.annualPrice > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Billed annually (${plan.annualPrice}/year)
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                variant={plan.popular ? "default" : "outline"}
                size="lg"
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, limitIndex) => (
                  <div key={limitIndex} className="flex items-start gap-2 opacity-60">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{limitation}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Feature Comparison */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Compare Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See exactly what's included in each plan
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Feature</th>
                    <th className="text-center p-4">Free</th>
                    <th className="text-center p-4">Pro</th>
                    <th className="text-center p-4">Team</th>
                    <th className="text-center p-4">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Monthly Prompts", free: "15", pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited" },
                    { feature: "AI Modes", free: "3 Basic", pro: "All", team: "All", enterprise: "All + Custom" },
                    { feature: "Team Members", free: "1", pro: "1", team: "5", enterprise: "Unlimited" },
                    { feature: "Collaboration", free: "❌", pro: "❌", team: "✅", enterprise: "✅" },
                    { feature: "Analytics", free: "Basic", pro: "Advanced", team: "Advanced", enterprise: "Custom" },
                    { feature: "API Access", free: "❌", pro: "✅", team: "✅", enterprise: "✅" },
                    { feature: "Support", free: "Community", pro: "Email", team: "Priority", enterprise: "24/7 Phone" },
                    { feature: "Custom Templates", free: "❌", pro: "✅", team: "✅", enterprise: "✅" },
                    { feature: "SSO", free: "❌", pro: "❌", team: "❌", enterprise: "✅" }
                  ].map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center">{row.free}</td>
                      <td className="p-4 text-center">{row.pro}</td>
                      <td className="p-4 text-center">{row.team}</td>
                      <td className="p-4 text-center">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6 py-12 bg-muted/50 rounded-lg">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of users who have already streamlined their AI prompt management
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8">
            <CreditCard className="w-5 h-5 mr-2" />
            No Credit Card Required
          </Button>
        </div>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            14-day free trial
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Cancel anytime
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            No setup fees
          </div>
        </div>
      </section>
    </div>
  )
}