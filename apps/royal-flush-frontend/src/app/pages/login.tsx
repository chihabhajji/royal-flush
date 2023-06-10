import { LoginSchema, LoginSchemaType } from '@royal/shared'
import { zodResolver } from "@hookform/resolvers/zod"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from '../../components/shad/form'
import { Input } from '../../components/shad/input'
import { Button } from '../../components/shad/button'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query'
import { HOME_AXIOS_CLIENT } from '../app';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AxiosError } from 'axios'

export default function Login() {
  // let move this to other place other time
  // check if user is logged in
  const navigate = useNavigate();
  // yo please make a hook for user logged in
  useEffect(() => {
    if(localStorage.getItem('token')) {
      alert('You are already logged in!')
      navigate('/profile')
    }
  }, [navigate])

      // 1. Define your form.
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // change the function onSubmit to  mutate
  // dear choba late i will use isLoading is Error and isSuccess don't worry
  const {isLoading, isError, isSuccess, error, mutate} = useMutation<any, AxiosError<Error>, LoginSchemaType>(['login'], async (requestDto: LoginSchemaType) => {
    try {
      const dto = structuredClone(requestDto) as any;
      const response = await HOME_AXIOS_CLIENT.post('/home/login', dto);
      if(response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success("Login Success");
        window.location.href = '/profile';
      }
      return response.data;
    } catch (err) {
      // Assuming toast is coming from 'react-toastify'
      toast.error( "Login failed");
      throw err; // rethrow the error, in case you want to handle it in an upper scope or have the 'error' from 'useMutation' updated.
    }
  });
    return (
      <div className='container mx-auto px-4'>
        <Form {...form}>
        <form         onSubmit={form.handleSubmit((v) => mutate(v))}  className="space-y-8 flex flex-col" onReset={() => form.reset()}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} type='email'/>
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
                  <Input placeholder="shadcn" {...field} type='password' autoComplete='new-password'/>
                </FormControl>
                <FormDescription>
                  Your super secret password!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex place-self-end'>
            <Button type="submit" className='font-medium text-purple-600 hover:underline' >Submit</Button>
            <Button type="reset">Reset</Button>
          </div>
        </form>
      </Form>
      </div>
    )
}
