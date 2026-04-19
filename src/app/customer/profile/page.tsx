export default function CustomerProfilePage() {
  return (
    <div>
      {/* <!-- Form Thông tin cá nhân --> */}
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Họ và tên</label>
            <input type="text" value="Alex Johnson"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" disabled/>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input type="email" value="alex.j@techpulse.example"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" disabled/>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Số điện thoại</label>
            <input type="text" value="+1 (555) 000-1234"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" disabled/>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Update Info</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Change Password</button>
        </div>
      </div>


      {/* <!-- Form Cập nhật thông tin --> */}
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
        <h2 className="text-xl font-semibold mb-4">Cập nhật thông tin</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Họ</label>
            <input type="text" placeholder="Nhập họ"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-300"/>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Tên</label>
            <input type="text" placeholder="Nhập tên"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-300"/>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Số điện thoại</label>
            <input type="text" placeholder="Nhập số điện thoại"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-300"/>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input type="email" placeholder="Nhập email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-300"/>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Giới tính</label>
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center">
                <input type="radio" name="gender" value="Nam" className="mr-2"/> Nam
              </label>
              <label className="flex items-center">
                <input type="radio" name="gender" value="Nữ" className="mr-2"/> Nữ
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Ảnh đại diện</label>
            <input type="file" className="mt-2"/>
          </div>

          <button type="submit"
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Lưu thông tin
          </button>
        </form>
      </div>

    </div>
  );
}
