import { useForm } from 'react-hook-form'
import { useAppDispatch } from '@src/app/hooks'
import { login } from './authSlice'
import styles from '@src/features/auth/LoginForm.module.css'

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onBlur', defaultValues: { name: '', email: '' } })
  const onSubmit = (data) => {
    dispatch(login(data))
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>login</h1>
      <div className="form-control">
        <label htmlFor="name" className="label">
          <span className="label-text"> name:</span>
        </label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="input"
          {...register('name', {
            required: 'Name is required!',
            maxLength: 100
          })}
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text"> email:</span>
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="input"
          {...register('email', {
            required: 'Email is required!',
            pattern: { message: 'Email is invalid!', value: /^\S+@\S+$/i }
          })}
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
      </div>

      <div className={styles.cta}>
        <button className="btn" type="submit">
          go
        </button>
      </div>
    </form>
  )
}

export default LoginForm
