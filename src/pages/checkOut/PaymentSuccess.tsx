import { Link } from "react-router-dom";

const PaymentSuccess = () => {

    return (
        <div className='w-full h-full flex flex-col gap-5 justify-center items-center mt-[20%]'>
            Payment Successfull ✅
            <Link to="/"><button className="bg-blue-900 text-white p-2">Shop More</button></Link>
        </div>
    );
};

export default PaymentSuccess;