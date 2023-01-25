import React, { useState, useMemo } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import MdcWeb from '@meronex/icons/mdc/MdcWeb';
import MdcFormatTitle from '@meronex/icons/mdc/MdcFormatTitle';
import MdcShapeOutline from '@meronex/icons/mdc/MdcShapeOutline';
import MdcFolderImage from '@meronex/icons/mdc/MdcFolderImage';

import CustomInputComponent from '../../Input'
import CustomCheckboxComponent from '../../Checkbox'
import CustomSelectComponent from '../../Select'

import assetsStore from '../../../stores/video_assets'

function validateForm({ name, bundle_type, asset, asset_type, fps, uploadTilesheet, rows, columns, count }) {
  const errors = {};
  if (!bundle_type) errors.bundle_type = 'Required'
  if (!name) errors.name = 'Required'

  if(asset_type === "animation" && uploadTilesheet) {
    if (!rows) errors.rows = 'Required'
    if (!columns) errors.columns = 'Required'
    if (!count) errors.count = 'Required'
  }

  return errors;
}

const BUNDLE_TYPES = [
  { label: "Overlay", value: "overlay" },
  { label: "Foreground", value: "foreground" },
  { label: "Logos", value: "logos" },
  { label: "Effects", value: "effects" }
]


export default function UpdateForm({ asset, update, onSuccess }) {
  const { folders } = assetsStore()
  const foldersDropdown = folders.map(f => ({ label: f.name, value: f.name }));


  async function handleFormSubmit(values, { setSubmitting, setStatus }) {
    setSubmitting(true)
    const res = await update(
      asset.id,
      { video_asset: { ...values, folder: values.folder == "" ? null : values.folder } }
      )
    setSubmitting(false)
    if (res?.success) {
      onSuccess()
    }
    else setStatus(res?.error || "An error occurred")
  }

  return (
    <Formik
      initialValues={{ ...asset, replaceAsset: false, folder: asset.folder == null ? "" : asset.folder }}
      validate={validateForm}
      onSubmit={handleFormSubmit}
    >
      {({ status, isValid, isSubmitting, values, setFieldValue }) => (
        <Form>
          <div className="mb-6 grid grid-cols-6 gap-6">
            {(values.folder == "" || values.folder == null || folders.some(f => f.name == values.folder)) && (
              <div className="col-span-6 sm:col-span-3">
                <Field
                  name="folder"
                  placeholder="Folder"
                  component={CustomSelectComponent}
                  options={foldersDropdown}
                  IconClass={MdcFolderImage}
                />
              </div>
            )}
            <div className="col-span-6 sm:col-span-3">
              <Field
                name="folder"
                placeholder="New Folder Name"
                component={CustomInputComponent}
                required={false}
                IconClass={MdcFolderImage}
              />
            </div>
          </div>
          <div className="mb-6">
            <Field
              name="name"
              component={CustomInputComponent}
              title="Asset name"
              required={false}
              IconClass={MdcFormatTitle}
            />
          </div>
          <div className="mb-6">
            <Field
              name="bundle_type"
              title="Bundle type"
              required={true}
              component={CustomSelectComponent}
              options={BUNDLE_TYPES}
              IconClass={MdcShapeOutline}
            />
          </div>
          {values.asset_type === "animation" && (
            <>
              <div className="mb-6">
                <Field
                  name="fps"
                  component={CustomInputComponent}
                  title="Animation FPS"
                  required={true}
                  type="number"
                  min="1"
                />
              </div>
              <div className="mb-6">
                <Field
                  name="loop"
                  component={CustomCheckboxComponent}
                  title="Loops?"
                />
              </div>
              <div className="mb-6">
                <Field
                  name="columns"
                  component={CustomInputComponent}
                  title="Columns"
                  required={true}
                  type="number"
                  min="1"
                />
              </div>
              <div className="mb-6">
                <Field
                  name="rows"
                  component={CustomInputComponent}
                  title="Rows"
                  required={true}
                  type="number"
                  min="1"
                />
              </div>
              <div className="mb-6">
                <Field
                  name="count"
                  component={CustomInputComponent}
                  title="Number of tiles in tilesheet"
                  required={true}
                  type="number"
                  min="1"
                  max="60"
                />
              </div>
            </>
          )}

          <Field
            name="replaceAsset"
            component={CustomCheckboxComponent}
            title="Replace asset?"
          />

          {values.replaceAsset && (
            <div className="mb-6">
              <p className="mb-2 text-xs text-red-600">Warning! All templates using this asset will be updated with the new uploaded asset</p>
              <Field name="image">
                {() => <input name="asset" accept="image/*" type="file" onChange={e => setFieldValue("asset", e.target.files[0])} />}
              </Field>
            </div>
          )}

          {status && <p className="text-center mb-2 text-sm text-red-600">{status}</p>}

          <button disabled={!isValid || isSubmitting} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full" type="submit">
            Update
          </button>
        </Form>
      )}
    </Formik>
  )
}