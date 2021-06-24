import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import editIcon from '../../img/edit-icon.png'
import saveIcon from '../../img/Icon awesome-save.png'

const CompanyProfileUpdateAccount = (props) => {
  const [state, setState] = useState({
    account: {
      name: 'name',
      position: 'position',
      phone: 'phone',
      email: 'email.com',
      pw: 'xxx',
      userTypeId: 3
    },
    isEditingProfile: true,
    userTypes: [
      { name: 'Company Admin', value: 3 },
      { name: 'Sub Company Admin', value: 4 }
    ]
  })

  const handleTextChange = (e) => {
    // console.log(state)
    state.account = {}
    const value = e.target.value
    setState((prevState) => {
      return {
        ...prevState,
        account: { ...prevState.account, [e.target.name]: value }
      }
    })
  }

  const userTypesChange = (value) => {
    setState((prevState) => {
      return {
        ...prevState,
        account: { ...prevState.account, userTypeId: value }
      }
    })
  }

  const handleUpdateSave = () => {
    console.log('handleUpdateSave')
  }

  return (
    <div className="w-full">
      <div className="align-top inline-block w-5/12 rounded-xl border-gray-200 border h-80 bg-white my-4 ml-14 mr-5 py-5 px-6">
        <div className="mx-10 mt-11 mb-2">
          <div className="flex flex-wrap gap-0 w-full justify-center mt-4 text-primary-200 text-xl">
            アカウントを更新
          </div>
          <div className="flex flex-wrap gap-0 w-full justify-start mt-4">
            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/3">
                <label className="text-sm text-gray-400">名前 :</label>
              </div>
              <div className="md:w-2/3 flex-grow">
                <label
                  className={
                    (state.isEditingProfile ? 'hidden' : '') +
                    ' text-sm text-black w-full h-8 px-3 leading-8'
                  }
                >
                  {state.account.name}
                </label>
                <input
                  className={
                    (state.isEditingProfile ? '' : 'hidden') +
                    ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  defaultValue={state.account.name}
                  type="text"
                  name="name"
                  placeholder="会社名"
                  onChange={handleTextChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-0 w-full justify-start">
            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/3">
                <label className="text-sm text-gray-400">役職 :</label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={
                    (state.isEditingProfile ? 'hidden' : '') +
                    ' text-sm text-black w-full h-8 px-3 leading-8'
                  }
                >
                  {state.account.position}
                </label>
                <input
                  className={
                    (state.isEditingProfile ? '' : 'hidden') +
                    ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  type="text"
                  name="position"
                  defaultValue={state.account.position}
                  placeholder="電話番号"
                  onChange={handleTextChange}
                />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/3">
                <label className="text-sm text-gray-400">電話番号 :</label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={
                    (state.isEditingProfile ? 'hidden' : '') +
                    ' text-sm text-black w-full h-8 px-3 leading-8'
                  }
                >
                  {state.account.phone}
                </label>
                <input
                  className={
                    (state.isEditingProfile ? '' : 'hidden') +
                    ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  type="text"
                  name="phone"
                  defaultValue={state.account.phone}
                  placeholder="ウェブサイト"
                  onChange={handleTextChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="align-top inline-block w-5/12  h-80">
        <div className="align-top inline-block w-full rounded-xl border-gray-200 border h-40 bg-white my-4   mr-5 py-5 px-6">
          <div className="mx-10 mb-2">
            <div className="flex flex-wrap gap-0 w-full justify-center text-primary-200 text-xl">
              ログイン情報
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start mt-4">
              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center">
                <div className="mb-1 md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">
                    メールアドレス:{' '}
                  </label>
                </div>
                <div className="md:w-2/3 flex-grow">
                  <label
                    className={
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {state.account.email}
                  </label>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                    }
                    defaultValue={state.account.email}
                    type="text"
                    name="email"
                    placeholder="会社名"
                    onChange={handleTextChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start">
              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-4">
                <div className="mb-1 md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">パスワード: </label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {state.account.pw}
                  </label>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                    }
                    type="password"
                    name="pw"
                    defaultValue={state.account.pw}
                    placeholder="電話番号"
                    onChange={handleTextChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="align-top inline-block w-full rounded-xl border-gray-200 border h-36 bg-white mr-5 py-5 px-6">
          <div className="mx-10  mb-2">
            <div className="flex flex-wrap gap-0 w-full justify-start mt-4">
              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">権限 :</label>
                </div>
                <div className="md:w-2/3 flex-grow">
                  <label
                    className={
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {state.account.userTypeId}
                  </label>
                  <select
                    name="select"
                    onChange={(event) => userTypesChange(event.target.value)}
                  >
                    {state.userTypes.map(function (t) {
                      return (
                        <option
                          key={t.value}
                          value={t.value}
                          selected={state.account.userTypeId === t.value}
                        >
                          {t.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 ml-6 mr-32 py-5 px-6 mt-0 pt-3 pl-0 text-center">
        <button
          onClick={handleUpdateSave}
          className="bg-primary-200 hover:bg-green-700 text-white  rounded-lg p-2 text-sm mr-5"
        >
          <img
            className="inline mr-2"
            src={state.isEditingProfile ? saveIcon : editIcon}
          />
          {state.formState === 'add form'
            ? '追加'
            : state.isEditingProfile
            ? '編集する'
            : '変更を保存'}
        </button>

        <button
          onClick={props.handleClose}
          className="bg-primary-200 hover:bg-green-700 text-white  rounded-lg p-2 text-sm mr-1"
        >
          <img className="inline mr-2" />
          キャンセル
        </button>
      </div>
    </div>
  )
}

export default CompanyProfileUpdateAccount
if (document.getElementById('companyProfileUpdateAccount')) {
  ReactDOM.render(
    <CompanyProfileUpdateAccount />,
    document.getElementById('companyProfile')
  )
}
