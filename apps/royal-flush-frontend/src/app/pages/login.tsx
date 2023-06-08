import { LoginSchema } from '@royal/shared'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form } from 'react-router-dom'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../../components/shad/form'
import { Input } from '../../components/shad/input'
import { Button } from '../../components/shad/button'
import { useForm } from 'react-hook-form'
export default function Login() {
      // 1. Define your form.
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
        password: '',
    },
  })

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    console.log(values)
  }
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  Your super secret password!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
}