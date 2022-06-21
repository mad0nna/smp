import React, { useState } from 'react'
import TextEditor from '../../TextEditor'
import { SaveIcon } from '../../../../icons'

const EmailTemplate = () => {
  const [sign, setSign] = useState(false)
  const [htmlContent, setHtmlContent] = useState('')

  const getContent = (htmlContentProp) => {
    setHtmlContent(htmlContentProp)
    console.log(htmlContentProp)
  }

  return (
    <>
      <h1 className="text-3xl text-primary-500 font-bold mt-3.5 mx-6 border-b-2 border-primary-300 pb-3.5">
        メールテンプレート設定
      </h1>
      <div className="mt-3.5 mx-6">
        <div className="flex items-center mt-7">
          <h1 className="text-3xl text-primaryBg mr-5">{'{{SUBJECT}}'}</h1>
          <p className="text-xs text-errorColor">
            テンプレートが設定されていません
          </p>
        </div>
        <div className="grid grid-rows-3 grid-cols-10 gap-y-5 pt-6 mt-6 mb-7 border-t-2 border-gray-100">
          <p className="text-base text-body-500">差出人</p>
          <p className="text-base text-black-100 col-span-9">KOT Admin</p>
          <p className="text-base text-body-500">注文番号</p>
          <p className="text-base text-tertiary-500 col-span-9">
            {'{{ORNumber}}'}
          </p>
          <p className="text-base text-body-500">宛先</p>
          <p className="text-base col-span-9 text-gray-500">
            {'{{OrderEmailAddress}}'}
          </p>
        </div>
        <TextEditor getContent={getContent} />
        <div className="mt-5">
          <input
            id="signature"
            name="signature"
            type="checkbox"
            onClick={() => {
              setSign((prevState) => !prevState)
            }}
            className="rounded-sm w-checkBox h-checkBox bg-white align-middle mr-2.5"
          />
          <label className="text-body-500" htmlFor="signature">
            署名を追加
          </label>
        </div>
        {sign && (
          <div className="mt-5">
            <textarea
              rows="4"
              className="border border-gray-100 w-full focus:outline-none"
            />
          </div>
        )}
        <div className="flex mt-12 mb-9 items-center">
          <button
            onClick={() => console.log('htmlContent: ', htmlContent)}
            type="button"
            className="flex w-24 rounded-md text-white bg-primary-500 justify-center mr-3 py-2"
          >
            <SaveIcon className="w-5 h-5 mr-2" />
            <p>保存</p>
          </button>
          <p className="text-errorColor">テンプレートが設定されていません</p>
        </div>
      </div>
    </>
  )
}

export default EmailTemplate
