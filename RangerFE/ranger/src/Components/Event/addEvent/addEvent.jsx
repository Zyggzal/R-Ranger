import { useForm } from 'react-hook-form'
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../Context/UserContext";
import {EventContext} from "../../../Context/Event/EventContext";
import InfoIcon from '../../Icons/InfoIcon/InfoIcon';
import ClockIcon from '../../Icons/ClockIcon/ClockIcon';
import ArrowDownIcon from '../../Icons/ArrowDownIcon/ArrowDownIcon';
import './addEvent.css'
import { useNavigate } from 'react-router-dom';

export const AddEvent = ({setStep}) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      setValue,
    } = useForm()
    const { user } = useContext(UserContext)
    const { addEvent } = useContext(EventContext)
  
    const [limit, setLimit] = useState(false)
  
    const watchStartDate = watch("startDate")
    const watchEndDate = watch("endDate")
    const watchSignUpEndDate = watch("signUpEndDate")

    const navigate = useNavigate()
  
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
  
    const onSubmit = async (values) => {
      const processedValues = {
        ...values,
        participantsLimit:
          limit && values.participantsLimit
            ? parseInt(values.participantsLimit)
            : null,
        createdBy: user.id,
        createdByGroup: null,
        isGroupEvent: "0",
        startDate: new Date(values.startDate).toISOString(),
        endDate: new Date(values.endDate).toISOString(),
        signUpEndDate: new Date(values.signUpEndDate).toISOString(),
      }
  
      const res = await addEvent(processedValues)
      if(res){
        navigate('/eventInvite', { state: { eventId: res.data[0].id }})
        setStep((s)=>s+1)
      }

    }
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="form p-5">
        <div className="mb-3 d-flex justify-content-between">
          <div>
            <label className="form-label">Event Name</label>
            <InfoIcon content={'The name of your event'}/>
            <input
              className={`form-control ${errors.name && 'is-invalid'}`}
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>
  
          <div>
            <label className="form-label">Type</label>
            <InfoIcon content={<p><strong>Public</strong> events will be open to anyone<br /><strong>Private</strong> events will only be accessible via invitations</p>}/>
            <select
              className="form-select"
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
                className="form-check-input me-2"
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
                className="form-control"
                type="number"
                min="1"
                {...register("participantsLimit")}
              />
              {errors.participantsLimit && (
                <span className="error">{errors.participantsLimit.message}</span>
              )}
            </div>
          </div>
        </div>
  
        <div className="mb-3">
          <label className="form-label">Event Description</label>
          <InfoIcon content={<p><strong>Public</strong> description.<br/>Write the info you want everyone to see here. <br/><span className='text-secondary'>General info: type of activity, target audience, etc.</span></p>}/>
          <textarea
            className={`form-control p-4 ${errors.description && 'is-invalid'}`}
            {...register("description", {
              required: "Public description is required",
            })}
            placeholder="Public Description"
          />
          {errors.description && (
            <span className="error">{errors.description.message}</span>
          )}
        </div>
  
        <div className="mb-3">
          <label className="form-label">Private Description</label>
          <InfoIcon content={<p><strong>Private</strong> description.<br/>Write the info you want only the participants to see here. <br/><span className='text-secondary'>Specific info: links, locations, etc.</span></p>}/>
          <textarea
            className={`form-control p-4 ${errors.link && 'is-invalid'}`}
            {...register("link", { required: "Private description is required" })}
            placeholder="Private Description"
          />
          {errors.link && <span className="error">{errors.link.message}</span>}
        </div>
        <div className="card p-5">
          <h1 className="mb-5">Event timeline</h1>
          <div className="d-flex justify-content-between">
            <div className="time-card">
              <label className="form-label">Sign up end date</label>
              <InfoIcon content={<p>After this date, users will be unable to sign up to the event.</p>}/>
              <input
                className={`form-control ${errors.signUpEndDate && 'is-invalid'}`}
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
                <span className="error">{errors.signUpEndDate.message}</span>
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
                className={`form-control ${errors.startDate && 'is-invalid'}`}
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
                <span className="error">{errors.startDate.message}</span>
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
                className={`form-control ${errors.endDate && 'is-invalid'}`}
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
                <span className="error">{errors.endDate.message}</span>
              )}
              <div className="pt-5">
                <ClockIcon />
              </div>
              <ArrowDownIcon />
            </div>
          </div>
          <hr className="timeline" />
        </div>
  
        <button type="submit" className="btn btn-primary mt-3">
          Create Event
        </button>
      </form>
    )
  }