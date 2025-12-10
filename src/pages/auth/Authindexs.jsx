import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import LoginSection from './login';
import Button from '../../components/ui/Button';
import Footer from '../../components/common/Footer';
import { loginUser } from '../../services/user-service';
import { doLogin } from '../../auth';
import { toast } from 'react-toastify';
import { notifyError, notifyInfo } from '../../utils/notify';



const LoginPage = () => {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // Handle input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = Object.entries(loginData)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      notifyInfo(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    try {
      const response = await loginUser(loginData);

      doLogin(
        response,
        () => {
          // Success: Navigate to dashboard
          navigate("/admin/branches");
        },
        (errorMsg) => {
          // Unauthorized role
          notifyError(errorMsg);  // You can also show a styled error message
        }
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        notifyError(error.response.data.message);
      } else {
        // Case: Server down or network issue
        notifyError("Login failed! Please try again later.");
      }
    }
  };









  return (
    <div className="flex min-h-screen flex-col bg-[#dcdcdc]">
      <Header />

      <div className="flex-grow container sm:px-6 lg:px-[100px] mx-auto px-4 py-4">
        <div className="max-w-[500px] bg-white border border-[#dcdcdc] rounded-[10px] p-6 mx-auto">
          <div className="flex flex-col md:flex-row gap-6">

            <div className="flex-1">
              <div className="border border-black rounded-[10px] p-6 ">
                <h1 className="text-[20px] font-bold text-black text-center mb-8">
                  AdminLogin
                </h1>

                <div className="h-2 bg-white border  border-[#f04f18] rounded-[4px]  mb-[80px]"></div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Branch Form */}
                  <LoginSection formData={loginData} handleChange={handleLoginChange} />


                  {/* Step 2: Manager Form */}




                  <div className="flex justify-center mt-[40px]">
                    <Button
                      className="w-[120px] h-[39px] flex items-center justify-center"
                      type="submit"
                      variant="secondary"
                    >
                      Loginnnnnn
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default LoginPage;
