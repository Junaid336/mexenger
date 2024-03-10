'use client'

import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { deflate } from 'zlib';
import axios from 'axios';
import { toast } from "react-hot-toast";

import { FcGoogle } from "react-icons/fc";

import Input from '../inputs/Input';
import Button from '../Button';
import AuthSocialButton from '../AuthSocialButton';




type Variant = 'LOGIN' | 'REGISTER';


const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        if (session?.status === 'authenticated') {
          router.push('/conversations')
        }
      }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if(variant === 'REGISTER') {
            axios.post('/api/register', data)
            .then(() => signIn('credentials', {
                ...data,
                redirect: false,
              }))
              .then((callback) => {
                if (callback?.error) {
                  toast.error('Invalid credentials!');
                }
        
                if (callback?.ok) {
                  toast.success('Success!');
                  router.push('/conversations')
                }
              })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))
        } 

        if (variant === 'LOGIN') {
            signIn('credentials', {
              ...data,
              redirect: false
            })
            .then((callback) => {
              if (callback?.error) {
                toast.error('Invalid credentials!');
              }
      
              if (callback?.ok) {
                toast.success("Logged In!")
                router.push('/conversations')
              }
            })
            .finally(() => setIsLoading(false))
          }
    }

    const socialAction = (action: string) => {
        setIsLoading(true)

        signIn(action, { redirect: false })
        .then((callback) => {
            if (callback?.error) {
                toast.error('Invalid credentials!');
            }

            if (callback?.ok) {
                toast.success('/Logged In')
            }
        })
        .finally(() => setIsLoading(false));
    }

    return (
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className=' bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
                <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'REGISTER' && (
                        <Input 
                         label="Name" 
                         register={register} 
                         errors={errors} 
                         id='name'
                         type='text'
                         disabled={isLoading}
                       />
                    )}
                    <Input 
                     label="Email" 
                     register={register} 
                     errors={errors} 
                     id='email'
                     type='text'
                     disabled={isLoading}
                    />
                    <Input 
                     label="Password" 
                     register={register} 
                     errors={errors} 
                     id='password'
                     type='password'
                     disabled={isLoading}
                    />
                    <div>
                        <Button disabled={isLoading} fullWidth type="submit" >
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div 
                        className="
                            absolute 
                            inset-0 
                            flex 
                            items-center
                        "
                        >
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton 
                         icon={FcGoogle} 
                         onClick={() => socialAction('google')} 
                        />
                    </div>
                </div>
                <div 
                className="
                flex 
                gap-2 
                justify-center 
                text-sm 
                mt-6 
                px-2 
                text-gray-500
                "
                >
                    <div>
                        {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'} 
                    </div>
                    <div 
                        onClick={toggleVariant} 
                        className="underline cursor-pointer"
                    >
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm