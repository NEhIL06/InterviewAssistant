import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CandidateForm from '@/components/CandidateForm';
import api from '@/lib/api';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        position: data.position,
        resumeText: data.resumeText || '',
      };

      const response = await api.post('/candidate/upload', payload);

      toast.success('Registration successful!');
      navigate(`/candidate/interview/${response.data.candidateId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Welcome, Candidate!
          </h1>
          <p className="text-muted-foreground">
            Complete your registration to begin the technical assessment
          </p>
        </motion.div>

        <CandidateForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Register;
