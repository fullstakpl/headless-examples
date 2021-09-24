import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabase'
import Layout from "../../components/Layout";

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState()
  const [avatarPublicUrl, setAvatarUrl] = useState()

  useEffect(() => {
    const fetchUser = async () => {
      const user = supabase.auth.user();
      if(user) {
        const { data } = await supabase.from('users').select('*').single();
        user.details = data;
      }
      console.log(`user`, user)
      setCurrentUser(user);
    }
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    await supabase
      .from('users')
      .update({ full_name: formData.get("fullName") })
      .match({ id: currentUser.details.id })
  }

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const avatarFile = formData.get("avatar")
    const { data: { Key: avatarKey} } = await supabase
      .storage
      .from('avatars')
      .upload(`${currentUser.id}/${avatarFile.name}`, formData.get("avatar"), {
        cacheControl: '3600',
        upsert: true
      })

    const { publicURL } = await supabase.storage.from("avatars").getPublicUrl(`${currentUser.id}/${avatarFile.name}`);
    setAvatarUrl(publicURL);
    console.log(`publicURL`, publicURL)
  }

  return (
    <Layout>
      <div className="row flex flex-center flex-wrap">
        <form className="w-full col-6 form-widget" onSubmit={handleSubmit}>
          <p className="description">Login</p>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your profile</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              value={currentUser?.email}
              disabled
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full name</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder={currentUser?.details?.full_name}
              className="input input-bordered"
            />
          </div>

          <div>
            <button
              type="submit"
              className="mt-10 btn btn-primary"
              disabled={loading}
            >
              <span>{loading ? 'Loading' : 'Update profile'}</span>
            </button>
          </div>
        </form>
        <form className="mt-10 w-full col-6 form-widget" onSubmit={handleUpload}>
          {avatarPublicUrl && <img src={avatarPublicUrl} />}
          <input type="file" name="avatar" />
          <button
              type="submit"
              className="block mt-10 btn btn-primary"
              disabled={loading}
            >
              <span>{loading ? 'Loading' : 'Upload avatar'}</span>
            </button>
        </form>
      </div>
    </Layout>
  )
}
