
import { XIcon } from 'lucide-react'

const Announcement = () => {


    return (
        <section className='flex flex-col gap-6'>
            <div className='grid w-full gap-5 p-4 border border-gray-300 rounded-md'>
                <div className='grid w-full grid-cols-3 gap-4 '>

                    <div className='flex flex-col gap-2'>
                        <label class="label">Branch (optional)</label>
                        <select className='py-1 border border-gray-300 rounded-md' class="select-box">
                            <option>All Branches</option>
                            <option>Branch A</option>
                            <option>Branch B</option>
                        </select>
                        <p className='text-xs text-gray-700'>Loaded from GET /api/v1/branches/</p>
                    </div>


                    <div className='flex flex-col gap-2'>
                        <label class="label">Role (optional)</label>
                        <select className='py-1 border border-gray-300 rounded-md' class="select-box">
                            <option>--Role--</option>
                            <option>Admin</option>
                            <option>Rider</option>
                            <option>User</option>
                        </select>
                        <p className='text-xs text-gray-700'>User role to target permission-level roles.</p>
                    </div>


                    <div className='flex flex-col gap-2'>
                        <label class="label">Mode (optional)</label>
                        <select className='py-1 border border-gray-300 rounded-md' class="select-box">
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
                        className="w-full h-32 p-3 border rounded-lg outline-none focus:border-blue-500"
                        placeholder="Write your message..."
                    >
                    </textarea>
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
                        {/* Send Notification button */}
                        <button
                            className="w-full py-3 font-semibold text-center text-white transition bg-yellow-500 rounded-lg hover:bg-green-700"
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