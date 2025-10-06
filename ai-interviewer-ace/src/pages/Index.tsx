import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserCircle, Users, BrainCircuit, Timer, CheckCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BrainCircuit,
      title: 'AI-Powered',
      description: 'Advanced AI evaluates technical responses in real-time',
    },
    {
      icon: Timer,
      title: 'Timed Sessions',
      description: 'Smart time management with automatic submission',
    },
    {
      icon: CheckCircle,
      title: 'Instant Scoring',
      description: 'Get detailed performance analytics immediately',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security for all assessments',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              AI-Powered Technical Interview Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Transform your hiring process with intelligent assessments and real-time evaluation
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                onClick={() => navigate('/candidate/register')}
                className="gap-2 shadow-elegant"
              >
                <UserCircle className="h-5 w-5" />
                Start as Candidate
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/interviewer/signin')}
                className="gap-2"
              >
                <Users className="h-5 w-5" />
                Interviewer Portal
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for modern hiring teams who value efficiency and accuracy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="h-full shadow-card hover:shadow-elegant transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of candidates and interviewers using our platform
            </p>
            <Button size="lg" onClick={() => navigate('/candidate/register')} className="shadow-elegant">
              Begin Your Interview Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
