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
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
const withConfirmation = RegisterSchema.and(z.object({
  confirmationPassword: z.string(),
})).refine((data) => data.confirmationPassword === data.password, {
  message: "Passwords must match",
  path: ["confirmationPassword"],
});
type RegisterSchemaType = z.infer<typeof withConfirmation>;
export default function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')) {
      alert('You are already logged in!')
      navigate('/')
    }
  }, [navigate])
  const {isLoading, isError, isSuccess, error, mutate} = useMutation(['register'], async (requestDto: RegisterSchemaType) => {
    const dto = structuredClone(requestDto) as any;
    delete dto.confirmationPassword;
    const response = await HOME_AXIOS_CLIENT.post('/home/register', dto);
    if(response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if(response.data.user.role === ERole.Admin) {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    }
    return response.data;
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) => mutate(v))}
        className="space-y-8"
        onReset={() => form.reset()}
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-red-950'>First name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} type="email" autoComplete='username'/>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} type="password" autoComplete='new-password'/>
              </FormControl>
              <FormDescription>Your super secret password!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="confirmationPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} type="password" autoComplete='new-password'/>
              </FormControl>
              <FormDescription>Your super secret password confirmation!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          !isLoading && (<div>
                    <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
          </div>)
        }
        <div>
        {
          isLoading && <Label>Loading...</Label>
        }
        {
          isSuccess && <Label>Success!</Label>
        }
        {isError && <Label>{(error as AxiosError<Error>).response?.data?.message}</Label>}
        </div>
      </form>
    </Form>
  );
}
