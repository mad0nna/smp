import React, { useEffect, useState } from 'react'

const AdminsList = (props) => {
  const [state, setState] = useState({
    sorted: [],
    loggedUser: props.admins.loggedUser
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
    //console.log(props.admins)
    if (
      props.admins.adminList !== undefined &&
      props.admins.adminList.length > 0
    ) {
      setState((prevState) => {
        return {
          ...prevState,
          sorted: props.admins.adminList,
          loggedUser: props.admins.loggedUser
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
        {state.sorted.map((admin, i) => {
          console.log(admin)
          return (
            <tr
              className="stripe-table-row h-20 font-meiryo text-sm text-gray-600"
              key={admin.id}
            >
              <td className=" w-2/12">
                {admin.first_name} {admin.last_name}
              </td>
              <td className="w-2/12">{admin.title}</td>
              <td className="w-1/12">
                {admin.user_type_id === 3 ? 'スーパー管理者' : '副管理者'}
              </td>
              <td className="w-2/12">{admin.email}</td>
              <td className="w-2/12">{admin.contact_num}</td>
              <td className="w-1/12">
                {admin.user_status_id === 1 ? 'アクティブ' : '保留中'}
              </td>
              <td className="w-2/12  grid-flow-row text-center">
                <a className="grid-flow-row inline text-primary-200">
                  {admin.user_type_id === 3 &&
                  state.loggedUser.user_type_id != 3 ? (
                    <div
                      className="cursor-pointer"
                      onClick={() => props.handleDisplayView(admin)}
                    >
                      見る&nbsp;
                    </div>
                  ) : null}
                  {(admin.user_type_id === 4 && admin.user_status_id != 5) ||
                  (admin.user_type_id != 3 && admin.user_status_id != 5) ||
                  admin.id === state.loggedUser.id ? (
                    <span
                      className="cursor-pointer"
                      onClick={() => props.handleDisplayUpdate(admin, i)}
                    >
                      更新 &nbsp;
                    </span>
                  ) : null}
                  {(state.loggedUser.user_type_id === 3 &&
                    admin.id != state.loggedUser.id) ||
                  (admin.user_type_id === 4 && admin.user_status_id != 5) ? (
                    <span
                      className="cursor-pointer"
                      onClick={() => props.handleDisplayDelete(admin, i)}
                    >
                      削除 &nbsp;
                    </span>
                  ) : null}
                  {admin.user_status_id === 5 ? (
                    <div
                      className="cursor-pointer"
                      onClick={() => props.handleResendEmailInvite(admin)}
                    >
                      招待状再送信
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
