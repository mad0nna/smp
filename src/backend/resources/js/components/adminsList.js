import React, { useEffect, useState } from 'react'

const AdminsList = (props) => {
  //console.log(props.mode)
  const [state, setState] = useState({
    sorted: []
  })

  const sortArray = (type) => {
    const types = {
      name: 'name',
      companyCode: 'email'
    }
    const sortProperty = types[type]
    const sort = state.sorted.sort((a, b) =>
      b[sortProperty] - a[sortProperty] ? 1 : -1
    )

    setState((prevState) => {
      return {
        ...prevState,
        sorted: sort
      }
    })
  }

  useEffect(() => {
    console.log(props.admins)
    if (props.admins !== undefined && props.admins.length > 0) {
      setState((prevState) => {
        return {
          ...prevState,
          sorted: props.admins
        }
      })
    }
  }, [props.admins])

  return (
    <table className="w-full h-auto text-center">
      <thead className="bg-table-header-Gray-100 text-table-header-Gray-400 h-3 font-bold text-lg tracking-tight">
        <tr className="h-12 w-12">
          <td>
            <span id="num" onClick={() => sortArray('name')}>
              名前&nbsp;
              <div
                className={
                  'inline-block h-4 w-4 bg-cover bg-no-repeat mr-2 bg-sort-icon-inactive group-hover:bg-sort-icon-active '
                }
              />
            </span>
          </td>
          <td>
            <span id="httId">役職</span>
          </td>
          <td>
            <span id="name">権限</span>
          </td>
          <td>
            <span id="email" onClick={() => sortArray('email')}>
              メールアドレス&nbsp;
              <div
                className={
                  'inline-block h-4 w-4 bg-cover bg-no-repeat mr-2 bg-sort-icon-inactive group-hover:bg-sort-icon-active '
                }
              />
            </span>
          </td>
          <td>
            <span id="contactPerson">電話番号</span>
          </td>
          <td>
            <span id="type">状態</span>
          </td>
          <td>
            <span id="telNum">操作</span>
          </td>
        </tr>
      </thead>
      <tbody className="transform even:bg-gray-500">
        {state.sorted.map((admin) => {
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
