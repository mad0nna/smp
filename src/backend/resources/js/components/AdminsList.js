import React, { useEffect, useState } from 'react'

const AdminsList = (props) => {
  const [state, setState] = useState({
    sorted: [],
    loggedUser: props.admins.loggedUser,
    orderAsc: false
  })
  const sortArray = (type) => {
    const types = {
      first_name: 'first_name',
      email: 'email'
    }

    const sortProperty = types[type]
    const sort = state.sorted.sort((a, b) => {
      if (state.orderAsc) {
        return b[sortProperty] > a[sortProperty] ? 1 : -1
      } else {
        return b[sortProperty] > a[sortProperty] ? -1 : 1
      }
    })

    setState((prevState) => {
      return {
        ...prevState,
        sorted: sort,
        orderAsc: !prevState.orderAsc
      }
    })
  }

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        sorted: props.admins.adminList,
        loggedUser: props.admins.loggedUser
      }
    })
  }, [props.admins])

  return (
    <table className="table-auto w-full mb-6">
      <thead className="bg-gray-50 border-b border-t border-gray-200">
        <tr className="h-11 text-xs text-gray-500 text-shadow-none">
          <th>
            <span id="fullName" onClick={() => sortArray('first_name')}>
              名前&nbsp;
              <div
                className={
                  'inline-block h-4 w-4 bg-cover bg-no-repeat mr-2 bg-sort-icon-inactive group-hover:bg-sort-icon-active '
                }
              />
            </span>
          </th>
          <th>
            <span id="httId">役職</span>
          </th>
          <th>
            <span id="name">権限</span>
          </th>
          <th>
            <span id="email" onClick={() => sortArray('email')}>
              メールアドレス&nbsp;
              <div
                className={
                  'inline-block h-4 w-4 bg-cover bg-no-repeat mr-2 bg-sort-icon-inactive group-hover:bg-sort-icon-active '
                }
              />
            </span>
          </th>
          <th className="text-right">
            <span id="contactPerson">電話番号</span>
          </th>
          <th>
            <span id="type">状態</span>
          </th>
          <th>
            <span id="telNum">操作</span>
          </th>
        </tr>
      </thead>
      <tbody className="transform px-3">
        {state.sorted.map((admin, i) => {
          return (
            <tr
              className="table-row font-sans text-sm text-gray-500 p-5 h-16 hover:bg-gray-50 border-b border-gray-100"
              key={admin.id}
            >
              <td className="text-center capitalize">
                {admin.first_name} {admin.last_name}
              </td>
              <td className="text-center">{admin.title}</td>
              <td className="text-center">
                {admin.user_type_id === 3 ? 'スーパー管理者' : '副管理者'}
              </td>
              <td className="text-center">{admin.email}</td>
              <td className="text-right">{admin.contact_num}</td>
              <td className="text-center">
                {admin.user_status_id === 1 ? 'アクティブ' : '保留中'}
              </td>
              <td className=" grid-flow-row text-center">
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
