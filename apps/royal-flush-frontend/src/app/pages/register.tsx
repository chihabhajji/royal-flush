import { ERole, RegisterSchema } from '@royal/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from '../../components/shad/form';
import { Input } from '../../components/shad/input';
import { Button } from '../../components/shad/button';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { HOME_AXIOS_CLIENT } from '../app';
import {z} from 'zod';
import { Label } from '../../components/shad/label';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import useSession from '../../hooks/useSession';
const withConfirmation = RegisterSchema.and(z.object({
  confirmationPassword: z.string(),
})).refine((data) => data.confirmationPassword === data.password, {
  message: "Passwords must match",
  path: ["confirmationPassword"],
});
type RegisterSchemaType = z.infer<typeof withConfirmation>;
export default function Register() {
  const { userData } = useSession({
    redirectTo: '/profile',
    redirectIfFound: true,
  })
  const navigate = useNavigate();
  const {isLoading, isError, isSuccess, error, mutate} = useMutation(['register'], async (requestDto: RegisterSchemaType) => {
    const dto = structuredClone(requestDto) as any;
    delete dto.confirmationPassword;
    try{
    const response = await HOME_AXIOS_CLIENT.post('/home/register', dto);
    if(response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if(response.data.user.role === ERole.Admin) {
        navigate('/profile')
      } else {
        navigate('/')
      }
    }
    return response.data;
  } catch (error) {
    toast.error('Something went wrong, please try again later')
  }
  
});

  
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(withConfirmation),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmationPassword: '',
    },
  });

  return (
    <div className='flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat' style={{backgroundImage: "url('https://usagif.com/wp-content/uploads/gifs/coffee-97.gif')",  } }>
    <div className='rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8'>
      <div className='text-white mb-8 flex flex-col items-center'>
        <h1 className='mb-2 text-2xl'>POC</h1>
        <span className='text-gray-300'>Enter Registration Details</span>
      </div>
      <Form {...form} >
        <form onSubmit={form.handleSubmit((v) => mutate(v))} className="space-y-8 flex flex-col" onReset={() => form.reset()}>
          {/* FirstName Field */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-200'>First name</FormLabel>
                <FormControl>
                  <Input className='rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md' placeholder="John" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* LastName Field */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-200'>Last name</FormLabel>
                <FormControl>
                  <Input className='rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md' placeholder="Doe" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Username Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-200'>Username</FormLabel>
                <FormControl>
                  <Input className='rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md' placeholder="johndoe" {...field} type="email" autoComplete='username'/>
                </FormControl>
              </FormItem>
            )}
          />
          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-200'>Password</FormLabel>
                <FormControl>
                  <Input className='rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md' placeholder="*********" {...field} type="password" autoComplete='new-password'/>
                </FormControl>
              </FormItem>
            )}
          />
          {/* Confirmation Password Field */}
          <FormField
            control={form.control}
            name="confirmationPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-200'>Confirm Password</FormLabel>
                <FormControl>
                  <Input className='rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md' placeholder="*********" {...field} type="password" autoComplete='new-password'/>
                </FormControl>
              </FormItem>
            )}
          />
          <div className='mt-8 flex justify-center'>
            <Button type="submit" className='rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600'>Submit</Button>
            <Button type="reset" className='rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600 ml-4'>Reset</Button>
          </div>
          <p>
            Don't have an account? <a href="/login" className='text-yellow-400 hover:text-yellow-600'>login</a>
          </p>
        </form>
      </Form>
    </div>
    
  </div>
  
  
  );
}
