import { LoginSchema, LoginSchemaType } from '@royal/shared'
import { zodResolver } from "@hookform/resolvers/zod"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from '../../components/shad/form'
import { Input } from '../../components/shad/input'
import { Button } from '../../components/shad/button'
import { useForm } from 'react-hook-form'
export default function Login() {
      // 1. Define your form.
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: LoginSchemaType) {
    console.log(values)
  }
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" onReset={() => form.reset()}>
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
          <Button type="submit" className='font-medium text-purple-600 hover:underline' >Submit</Button>
          <Button type="reset">Reset</Button>
        </form>
        
      </Form>
      
    )
}
