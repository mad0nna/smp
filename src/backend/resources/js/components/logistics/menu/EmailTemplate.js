import React from 'react'
import TextEditor from '../../TextEditor'

const EmailTemplate = () => {
  return (
    <>
      <h1 className="text-3xl text-primary-500 font-bold mt-3.5 mx-6 border-b-2 border-primary-300 pb-3.5">
        メールテンプレート設定
      </h1>
      <div className="mt-3.5 mx-6">
        <div className="flex items-center mt-7">
          <h1 className="text-3xl text-primaryBg">{'{{SUBJECT}}'}</h1>
          <p className="text-xs text-errorColor">
            テンプレートが設定されていません
          </p>
        </div>
        <div className="grid grid-rows-3 grid-cols-10 gap-y-5 pt-6 mt-3 mb-7 border-t-2 border-gray-100">
          <p className="text-base text-body-100">差出人</p>
          <p className="text-base text-black-100 col-span-9">KOT Admin</p>
          <p className="text-base text-body-100">注文番号</p>
          <p className="text-base text-tertiary-500 col-span-9">
            {'{{ORNumber}}'}
          </p>
          <p className="text-base text-body-100">宛先</p>
          <p className="text-base col-span-9 text-gray-500">
            {'{{OrderEmailAddress}}'}
          </p>
        </div>
        <TextEditor />
      </div>
    </>
  )
}

export default EmailTemplate
