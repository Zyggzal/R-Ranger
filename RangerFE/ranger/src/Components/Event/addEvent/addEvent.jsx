import { useForm } from 'react-hook-form'
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../Context/UserContext";
import InfoIcon from '../../Icons/InfoIcon/InfoIcon';
import ClockIcon from '../../Icons/ClockIcon/ClockIcon';
import ArrowDownIcon from '../../Icons/ArrowDownIcon/ArrowDownIcon';
import './addEvent.css'

export const AddEvent = ({ onSubmit, oldEvent, groupId }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      setValue,
    } = useForm()
    const { user } = useContext(UserContext)
  
    const [limit, setLimit] = useState(false)
  
    const watchStartDate = watch("startDate")
    const watchEndDate = watch("endDate")
    const watchSignUpEndDate = watch("signUpEndDate")
  
    useEffect(() => {
      if (watchStartDate) {
        if (
          watchSignUpEndDate &&
          new Date(watchSignUpEndDate) > new Date(watchStartDate)
          ) {
          setValue("signUpEndDate", watchStartDate)
        }
        if (watchEndDate && new Date(watchEndDate) < new Date(watchStartDate)) {
          setValue("endDate", watchStartDate)
        }
      }
    }, [watchStartDate, setValue])

    useEffect(() => {
      if (watchEndDate) {
        if (
          watchStartDate &&
          new Date(watchStartDate) > new Date(watchEndDate)
          ) {
          setValue("endDate", watchStartDate)
        }
      }
    }, [watchEndDate, setValue])

    useEffect(() => {
        if (watchSignUpEndDate) {
            if (
                watchStartDate &&
                new Date(watchStartDate) < new Date(watchSignUpEndDate)
            ) {
                setValue("signUpEndDate", watchStartDate)
        }
      }
    }, [watchSignUpEndDate, setValue])
  
    const onEventSubmit = async (values) => {
      const processedValues = {
        ...values,
        participantsLimit:
          limit && values.participantsLimit
            ? parseInt(values.participantsLimit)
            : null,
        createdBy: user.id,
        createdByGroup: groupId ? groupId : null,
        isGroupEvent: groupId ? "1" : "0",
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
        signUpEndDate: new Date(values.signUpEndDate),
      }
      onSubmit(processedValues);
    }

    useEffect(() => {
      if(oldEvent) {
        setValue('name', oldEvent.name)
        setValue('isPublic', oldEvent.isPublic ? '1' : '0')
        setValue('participantsLimit', oldEvent.participantsLimit)
        setValue('publicDescription', oldEvent.publicDescription)
        setValue('privateDescription', oldEvent.privateDescription)

        const convertDate = (value) => {
          let date = new Date(value);

          return `${date.toISOString().substring(0, 10)}T${date.toLocaleTimeString().substring(0, 5)}`
        }
        setValue('signUpEndDate', convertDate(oldEvent.signUpEndDate))
        setValue('startDate', convertDate(oldEvent.startDate))
        setValue('endDate', convertDate(oldEvent.endDate))
      }
    }, [oldEvent])
  
    return (
      <form onSubmit={handleSubmit(onEventSubmit)} className="form p-5 add-page-form">
        <div className="mb-3 first-line">
          <div>
            <label className="form-label">Event Name</label>
            <InfoIcon content={'The name of your event'}/>
            <input
              className={`add-page-input form-control ${errors.name && 'is-invalid'}`}
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <span className="invalid-feedback error">{errors.name.message}</span>}
          </div>
          <div className='me-5'>
            <label className="form-label">Type</label>
            <InfoIcon content={<p><strong>Public</strong> events will be open to anyone<br /><strong>Private</strong> events will only be accessible via invitations</p>}/>
            <select
              className="add-page-input form-select"
              {...register("isPublic")}
              defaultValue="1"
            >
              <option value="1">Public</option>
              <option value="0">Private</option>
            </select>
          </div>

          <div>
            <div className="d-flex align-items-center">
              <input
                className="add-page-input form-check-input me-2"
                type="checkbox"
                checked={limit}
                onChange={(e) => setLimit(e.target.checked)}
              />
              <label className="form-label mb-0">Participants limit</label>
              <InfoIcon
                content={<p>The limit of participants for this event.</p>}
              />
            </div>
            <div>
              <input
                disabled={!limit}
                className="add-page-input form-control"
                type="number"
                min='1' 
                {...register("participantsLimit")}
                />
                {errors.participantsLimit && (
                  <span className="invalid-feedback error">{errors.participantsLimit.message}</span>
                )}
              </div>
          </div>
        </div>
  
        <div className="mb-3">
          <label className="form-label">Event Description</label>
          <InfoIcon content={<p><strong>Public</strong> description.<br/>Write the info you want everyone to see here. <br/><span className='text-secondary'>General info: type of activity, target audience, etc.</span></p>}/>
          <textarea
            className={`add-page-input form-control p-4 ${errors.publicDescription && 'is-invalid'}`}
            {...register("publicDescription", {
              required: "Public description is required",
            })}
            placeholder="Public Description"
          />
          {errors.publicDescription && (
            <span className="invalid-feedback error">{errors.publicDescription.message}</span>
          )}
        </div>
  
        <div className="mb-3">
          <label className="form-label">Private Description</label>
          <InfoIcon content={<p><strong>Private</strong> description.<br/>Write the info you want only the participants to see here. <br/><span className='text-secondary'>Specific info: links, locations, etc.</span></p>}/>
          <textarea
            className={`add-page-input form-control p-4 ${errors.privateDescription && 'is-invalid'}`}
            {...register("privateDescription", { required: "Private description is required" })}
            placeholder="Private Description"
          />
          {errors.privateDescription && <span className="invalid-feedback error">{errors.privateDescription.message}</span>}
        </div>
        <div className="card p-5 time-container">
          <h1 className="mb-5">Event timeline</h1>
          <div className="d-flex justify-content-between time-card-container">
            <div className="time-card">
              <label className="form-label">Sign up end date</label>
              <InfoIcon content={<p>After this date, users will be unable to sign up to the event.</p>}/>
              <input
                className={`date-picker-input add-page-input form-control ${errors.signUpEndDate && 'is-invalid'}`}
                type="datetime-local"
                {...register("signUpEndDate", {
                  required: "Sign up end date is required",
                  validate: (value) =>
                    !watchStartDate ||
                    new Date(value) <= new Date(watchStartDate) ||
                    "Sign up must end before or at event start",
                })}
              />
              {errors.signUpEndDate && (
                <span className="invalid-feedback error">{errors.signUpEndDate.message}</span>
              )}
              <div className="pt-5">
                <ClockIcon />
              </div>
              <ArrowDownIcon />
            </div>
  
            <div className="time-card">
              <label className="form-label">Start date</label>
              <InfoIcon content={<p>When this event starts.</p>}/>
              <input
                className={`date-picker-input add-page-input form-control ${errors.startDate && 'is-invalid'}`}
                type="datetime-local"
                {...register("startDate", {
                  required: "Start date is required",
                  validate: (value) =>
                    !watchEndDate ||
                    new Date(value) <= new Date(watchEndDate) ||
                    "Start date must be before end date",
                })}
              />
              {errors.startDate && (
                <span className="invalid-feedback error">{errors.startDate.message}</span>
              )}
              <div className="pt-5">
                <ClockIcon />
              </div>
              <ArrowDownIcon />
            </div>
  
            <div className="time-card">
              <label className="form-label">End Date</label>
              <InfoIcon content={<p>When this event ends.</p>}/>
              <input
                className={`date-picker-input add-page-input form-control ${errors.endDate && 'is-invalid'}`}
                type="datetime-local"
                {...register("endDate", {
                  required: "End date is required",
                  validate: (value) =>
                    !watchStartDate ||
                    new Date(value) >= new Date(watchStartDate) ||
                    "End date must be after start date",
                })}
              />
              {errors.endDate && (
                <span className="invalid-feedback error">{errors.endDate.message}</span>
              )}
              <div className="pt-5">
                <ClockIcon />
              </div>
              <ArrowDownIcon />
            </div>
          </div>
          <hr className="timeline" />
        </div>
  
        <button type="submit" className="btn mt-3 btn-crimson">
          Confirm
        </button>
      </form>
    )
  }