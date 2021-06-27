import React from 'react'

const AdminsList = (props) => {
  //console.log(props.mode)
  return (
    <table className="w-full h-auto text-center">
      <thead className="bg-table-header-Gray-100 text-table-header-Gray-400 h-3 font-bold text-lg tracking-tight">
        <tr className="h-12 w-12">
          <td>
            <span id="num">名前</span>
          </td>
          <td>
            <span id="httId">役職</span>
          </td>
          <td>
            <span id="name">権限</span>
          </td>
          <td>
            <span id="type">メールアドレス</span>
          </td>
          <td>
            <span id="contactPerson">電話番号</span>
          </td>
          <td>
            <span id="email">状態</span>
          </td>
          <td>
            <span id="telNum">操作</span>
          </td>
        </tr>
      </thead>
      <tbody className="transform even:bg-gray-500">
        {props.admins.map((admin) => {
          return (
            <tr
              className="stripe-table-row h-20 font-meiryo text-sm text-gray-600"
              key={admin.id}
            >
              <td className=" w-2/12">
                {admin.firstName} {admin.lastName}
              </td>
              <td className="w-2/12">{admin.title}</td>
              <td className="w-1/12">
                {admin.userTypeId === 3 ? 'Super Admin' : 'User Admin'}
              </td>
              <td className="w-2/12">{admin.email}</td>
              <td className="w-2/12">{admin.contactNum}</td>
              <td className="w-1/12">
                {admin.userStatusId === 1 ? 'Active' : 'Pending'}
              </td>
              <td className="w-2/12">
                <a href="#">
                  {admin.userTypeId === 3 ? (
                    <div onClick={() => props.handleDisplayView(admin)}>
                      View
                    </div>
                  ) : null}
                  {admin.userTypeId === 4 && admin.userStatusId != 5 ? (
                    <div className="flex flex-row justify-center text-sm text-center">
                      <div
                        className="cursor-pointer"
                        onClick={() => props.handleDisplayUpdate(admin)}
                      >
                        Update
                      </div>{' '}
                      |
                      <div onClick={() => props.handleDisplayDelete(admin)}>
                        Delete
                      </div>
                    </div>
                  ) : null}
                  {console.log(props.HandleResendInvite)}
                  {admin.userStatusId === 5 ? (
                    <div
                      className="cursor-pointer"
                      onClick={() => props.HandleResendInvite(admin)}
                    >
                      Resend Invite
                    </div>
                  ) : null}
                </a>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default AdminsList
