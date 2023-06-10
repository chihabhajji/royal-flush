import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema, LoginSchemaType } from '@royal/shared'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from '../../components/shad/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../components/shad/form'
import { Input } from '../../components/shad/input'
import useSession from '../../hooks/useSession'
import { HOME_AXIOS_CLIENT } from '../../lib/axios'

export default function Login() {
  // let move this to other place other time
  // check if user is logged in
  useSession({
    redirectTo: '/profile',
    redirectIfFound: true,
  })

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
      // remember to call the image from assets folder
<div className='flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat' style={{backgroundImage: "url('https://wallpapercave.com/wp/wp10770686.jpg')" }}>
  <div className='rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8'>
    <div className='text-white mb-8 flex flex-col items-center'>
      <h1 className='mb-2 text-2xl'>POC</h1>
      <span className='text-gray-300'>Enter Login Details</span>
    </div>
    <Form {...form} >
      <form onSubmit={form.handleSubmit((v) => mutate(v))} className="space-y-8 flex flex-col" onReset={() => form.reset()}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-200'>Username</FormLabel>
              <FormControl>
                <Input className='rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md' placeholder="id@email.com" {...field} type='email'/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-200'>Password</FormLabel>
              <FormControl>
                <Input className='rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md' placeholder="*********" {...field} type='password' autoComplete='new-password'/>
              </FormControl>
            </FormItem>
          )}
        />
        <div className='mt-8 flex justify-center'>
          <Button type="submit" className='rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600'>Submit</Button>
          <Button type="reset" className='rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600 ml-4'>Reset</Button>
        </div>
        <div className='mt-8 flex justify-center'>
          <p>
            Don't have an account? <a href="/register" className='text-yellow-400 hover:text-yellow-600'>Register</a>
          </p>
        </div>
      </form>
    </Form>
  </div>
</div>
    )
}
