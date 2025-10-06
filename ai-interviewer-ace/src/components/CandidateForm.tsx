import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { extractTextFromPDF } from '@/lib/pdfExtractor';
import { toast } from 'sonner';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  position: z.string().min(2, 'Position is required'),
  resumeText: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface CandidateFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

const CandidateForm = ({ onSubmit, isLoading }: CandidateFormProps) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    setIsExtracting(true);
    setFileName(file.name);
    
    try {
      const extractedText = await extractTextFromPDF(file);
      setValue('resumeText', extractedText);
      toast.success('Resume text extracted successfully');
    } catch (error) {
      toast.error('Failed to extract text from PDF');
      setFileName('');
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-elegant">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Candidate Registration</CardTitle>
          <CardDescription>
            Fill in your details to start the AI-powered technical interview
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register('name')}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="1234567890"
                {...register('phone')}
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Applied Position</Label>
              <Input
                id="position"
                placeholder="Frontend Developer"
                {...register('position')}
                className={errors.position ? 'border-destructive' : ''}
              />
              {errors.position && (
                <p className="text-sm text-destructive">{errors.position.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume">Resume (Optional - PDF only)</Label>
              <div className="relative">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                  disabled={isExtracting || isLoading}
                />
                <Upload className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
              {fileName && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>{fileName}</span>
                </div>
              )}
              {isExtracting && (
                <p className="text-sm text-muted-foreground">Extracting text from PDF...</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || isExtracting}>
              {isLoading ? 'Submitting...' : isExtracting ? 'Extracting Resume...' : 'Start Interview'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CandidateForm;
