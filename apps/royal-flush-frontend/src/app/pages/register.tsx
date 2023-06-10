import { RegisterSchema } from '@royal/shared';
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
const withConfirmation = RegisterSchema.and(z.object({
  confirmationPassword: z.string(),
}));
type RegisterSchemaType = z.infer<typeof withConfirmation>;
export default function Register() {
  const {data, isLoading, isError, isSuccess, error, mutate} = useMutation(['register'], async (requestDto: RegisterSchemaType) => {
    const response = await HOME_AXIOS_CLIENT.post('/auth/register', requestDto);
    return response.data;
  });
  // 1. Define your form.
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
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
              <FormLabel>First name</FormLabel>
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
                <Input placeholder="shadcn" {...field} type="email" />
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
                <Input placeholder="shadcn" {...field} type="password" />
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
                <Input placeholder="shadcn" {...field} type="password" />
              </FormControl>
              <FormDescription>Your super secret password confirmation!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </form>
    </Form>
  );
}
