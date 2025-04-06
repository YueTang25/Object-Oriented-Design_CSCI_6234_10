export default function ProfilePage() {
    return (
    <div>
        <nav className="bg-white text-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <a href="/">WeCureIt</a>
          </h1>
          <div className="space-x-4">
            <a href="/register" className="hover:underline bg-black text-white  p-2 border rounded-md">Logout</a>
          </div>
        </div>
      </nav>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-black text-center">Profile</h1>
          <form className="mt-4 space-y-4">
            <label className="text-lg text-black font-semibold ">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded-md text-black focus:bg-gray-200 focus:outline-black"
            />
            <label className="text-lg text-black font-semibold ">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded-md text-black focus:bg-gray-200 focus:outline-black"
            />
            <label className="text-lg text-black font-semibold ">Address</label>
            <input
              type="email"
              placeholder="Address"
              className="w-full p-2 border rounded-md text-black focus:bg-gray-200 focus:outline-black"
            />
             <label className="text-lg text-black font-semibold ">Phone Number</label>
            <input
              type="tel"
              placeholder="(XXX)(XXX-XXXX)"
              className="w-full p-2 border rounded-md text-black focus:bg-gray-200 focus:outline-black"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
            />
            <label className="text-lg text-black font-semibold ">Date of Birth</label>
            <input
              type="date"
              placeholder="Address"
              className="w-full p-2 border rounded-md text-black focus:bg-gray-200 focus:outline-black"
            />
             <label className="text-lg text-black font-semibold ">Gender</label>
            <select
                id="gender"
                className="w-full p-2 border rounded-md text-black focus:bg-gray-200 focus:outline-black"
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            
            <button type="submit" className="w-full p-2 bg-black text-white rounded-md">
              Edit
            </button>
          </form>
        </div>
      </div>
        <footer className="bg-white text-black text-center p-4">
         <p>&copy; 2025 WeCureIt. </p>
        </footer>
    
    
    </div>
    );
  }
  