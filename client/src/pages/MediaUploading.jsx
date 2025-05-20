    import React, { useState, useRef } from 'react'
    import toast, { Toaster } from 'react-hot-toast';
    import axios from 'axios'

    const MediaUploading = () => {
        const [file, setFile] = useState(null);
        const fileInputRef = useRef(null);

        const handleMediaUpload = async (e) => {
            e.preventDefault();
            const formData = new FormData()
            formData.append('file',file)
            try {
                const response = await axios.post("http://localhost:2000/media-upload", formData);
                toast.success(response.data.message);

                setFile(null);
                fileInputRef.current.value = null;
            }
            catch (err) {
                toast.error(err);
            }
        }
        return (
            <>
                <div className='flex justify-center my-14'>
                    <form onSubmit={handleMediaUpload}>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                            <legend className="fieldset-legend">Add Media</legend>

                            <label className="label">Name</label>
                            <input type="file" className="file-input" 
                            ref={fileInputRef}
                            onChange={(e) => setFile(e.target.files[0])} name="uploaded-file"/>

                            <button className="btn btn-neutral mt-4">Add</button>
                        </fieldset>
                    </form>
                </div>

                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </>
        )
    }

    export default MediaUploading
