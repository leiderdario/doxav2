
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ThoughtChatLogo from "@/components/common/ThoughtChatLogo";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      toast.success("Login successful!");
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pale-blue to-soft-peach flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center">
            <ThoughtChatLogo className="h-8 w-8 mr-2" />
            <span className="font-bold text-2xl text-dark-blue">Doxa</span>
          </div>
          <p className="text-medium-gray mt-2">Welcome back! Log in to your account</p>
        </div>
        
        <Card className="border border-blue-gray/10 shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-dark-blue">Log In</CardTitle>
            <CardDescription className="text-medium-gray">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-dark-gray">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" className="border-blue-gray/20 focus:border-vivid-blue" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-dark-gray">Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" className="border-blue-gray/20 focus:border-vivid-blue" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-vivid-blue hover:bg-vivid-blue/90 text-white" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-4 text-center">
              <Link to="/forgotten-password" className="text-sm text-vivid-blue hover:text-vivid-blue/80 hover:underline">
                Forgot password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-blue-gray/10 pt-4">
            <p className="text-sm text-medium-gray">
              Don't have an account?{" "}
              <Link to="/register" className="text-vivid-blue hover:text-vivid-blue/80 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
