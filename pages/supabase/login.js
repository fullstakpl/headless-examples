import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabase'
import Layout from "../../components/Layout";

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const user = supabase.auth.user();
    console.log(`user`, user)
  }, []);

  const handleLogin = async (data) => {
    try {
      setLoading(true)
      const { user, session, error } = await supabase.auth.signIn({ email: data.email, password: data.password })
      if (error) throw error
      console.log({ user, session });
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="row flex flex-center">
        <div className="col-6 form-widget">
          <p className="description">Login</p>
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
          <div>
            <button
              onClick={(e) => {
                e.preventDefault()
                handleLogin({ email, password })
              }}
              className="btn btn-primary"
              disabled={loading}
            >
              <span>{loading ? 'Loading' : 'Login'}</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
