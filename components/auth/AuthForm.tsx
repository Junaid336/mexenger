'use client'

import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { deflate } from 'zlib';

import { BsGithub, BsGoogle  } from 'react-icons/bs';

import Input from '../inputs/Input';
import Button from '../Button';
import AuthSocialButton from '../AuthSocialButton';



type Variant = 'LOGIN' | 'REGISTER';


const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false); 

    const toggleVariant = (()=>{
        variant === 'LOGIN' ? setVariant('REGISTER') : setVariant('LOGIN')
    })

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

        } else {

        }
    }

    const socialAction = (action: string) => {

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
                       />
                    )}
                    <Input 
                     label="Email" 
                     register={register} 
                     errors={errors} 
                     id='email'
                     type='text'
                    />
                    <Input 
                     label="Password" 
                     register={register} 
                     errors={errors} 
                     id='password'
                     type='text'
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
                         icon={BsGithub} 
                         onClick={() => socialAction('github')} 
                        />
                        <AuthSocialButton 
                         icon={BsGoogle} 
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