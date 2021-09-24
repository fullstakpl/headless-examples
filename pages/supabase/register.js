import { useState } from 'react'
import { supabase } from '../../utils/supabase'
import Layout from "../../components/Layout";

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (data) => {
    setError('');
    const { user, session, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    if(error) {
      setError(error.message);
      return;
    }

    console.log({ user, session, error })
  }

  return (
    <Layout>
      <div className="row flex flex-center">
        <div className="col-6 form-widget">
          <h1 className="description">Register below</h1>

          <div className="form-control">
            <label className="label">
              <span className="label-text">E-mail</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <button
              onClick={(e) => {
                e.preventDefault()
                handleRegister({email, password})
              }}
              className="btn btn-primary"
              disabled={loading}
            >
              <span>{loading ? 'Loading' : 'Register'}</span>
            </button>
          </div>
          <div>
            <p>{error}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
