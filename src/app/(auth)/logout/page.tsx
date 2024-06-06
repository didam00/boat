import axios from "axios";

export default function LogoutPage() {
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
    } catch (error: any) {
      console.log(error.message)      
    }
  }

  logout()
  
  return (
    <></>
  )
}