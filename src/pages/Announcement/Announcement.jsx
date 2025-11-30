
import { XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Announcement = () => {

    const [branches, setBranches] = useState([]);
    const [form, setForm] = useState({
        branch: "",
        role: "",
        mode: "",
        message: "",
    });

    const isFormComplete = form.message.trim() !== "";

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Notification send successfully.")
    }
    useEffect(() => {
        fetch("https://api.mytufan.com/api/v1/branches/")
            .then(res => res.json())
            .then(data => {
                console.log("API DATA:", data);  // should log your array
                setBranches(data);               // data is already an array
            })
            .catch(err => console.error("FETCH ERROR:", err));
    }, []);

    return (
        <section className='flex flex-col gap-6'>
            <div className='grid w-full gap-5 p-4 border border-gray-300 rounded-md'>
                <div className='grid w-full grid-cols-3 gap-4 '>

                    <div className='flex flex-col gap-2'>
                        <label class="label">Branch (optional)</label>
                        <select
                            name='branch'
                            value={form.branch}
                            onChange={handleChange}
                            className='py-1 border border-gray-400 rounded-md select-box'>
                            <option>All Branches</option>
                            {branches.map(branch => (
                                <option key={branch.id} value={branch.id}>
                                    {branch.name} ({branch.branchCode})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label class="label">Role (optional)</label>
                        <select
                            name='role'
                            value={form.role}
                            onChange={handleChange}
                            className='py-1 border border-gray-400 rounded-md select-box'>
                            <option>--Role--</option>
                            <option>Admin</option>
                            <option>Rider</option>
                            <option>User</option>
                        </select>
                        <p className='text-xs text-gray-700'>User role to target permission-level roles.</p>
                    </div>


                    <div className='flex flex-col gap-2'>
                        <label class="label">Mode (optional)</label>
                        <select
                            name='mode'
                            value={form.mode}
                            onChange={handleChange}
                            className='py-1 border border-gray-400 rounded-md select-box'>
                            <option>--Mode--</option>
                            <option>Rider</option>
                            <option>Passenger</option>
                        </select>
                        <p className='text-xs text-gray-700'>Modes takes precedence over role when set(excat user type)</p>
                    </div>
                </div>
                <div>
                    <label>
                        Message (required)
                    </label>
                    <textarea
                        name='message'
                        className="w-full h-32 p-3 border rounded-lg outline-none focus:border-blue-500"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Write your message..."
                    />

                    {/* optional */}
                    <div className='mt-4'>
                        <label>
                            Optional Data Payload(Key & value)
                        </label>
                        <div className='flex gap-2'>
                            <input
                                type="text"
                                placeholder="key"
                                className="flex-1 p-2 border rounded-lg"
                            />

                            <input
                                type="text"
                                placeholder="value"
                                className="flex-1 p-2 border rounded-lg"
                            />
                            <button
                                className="p-2 font-bold text-gray-600 hover:text-red-500"
                            >
                                <XIcon className='font-bold' />
                            </button>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button
                                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                + Add data
                            </button>

                            <button
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <button
                            type="button"
                            disabled={!isFormComplete}
                            onClick={handleSubmit}
                            className={`w-full py-3 font-semibold text-center text-white transition rounded-lg 
                             ${isFormComplete ? 'bg-[#f04f18] hover:cursor-pointer hover:bg-[#d04314]' : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                            Send Notification
                        </button>


                        {/* Reset button */}
                        <button
                            className="w-full py-3 mt-3 font-medium text-center text-gray-700 transition bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            Reset
                        </button>
                        <div />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Announcement