import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChoseInfoContainer,
  ErrorInfo,
  FieldTextarea,
  FormButtonLesson,
  FormLesson,
  FormMainInfo,
  TextAreaTitle,
  TitleForm,
} from './AddLesson.styled';
import DatePickerLesson from '../DatePickerLesson/DatePickerLesson';
import AddTypeLesson from '../AddTypeLesson/AddTypeLesson';
import AddChildLesson from '../AddChildLesson/AddChildLesson';
import AddTeacherToLesson from '../AddTeacherToLesson/AddTeacherToLesson';
import PriceLesson from '../PriceLesson/PriceLesson';
import {
  initialValuesLessonForm,
  schemaAddLessonUpdate,
} from '../Schema/schema';
import { addLesson, updateLesson } from 'redux/Lesson/lessonOperetion';
import ChoseLessonContainer from 'components/ChoseLessonData/ChoseLessonContainer/ChoseLessonContainer';

const AddLesson = ({ lesson }) => {
  const [valuesLesson, setValuesLesson] = useState(initialValuesLessonForm);
  const [typeLesson, setTypeLesson] = useState('Сенсорна');
  const [addSuccessLesson, setAddSuccessLesson] = useState(false);
  const [child, setChild] = useState('');
  const [childName, setChildName] = useState('');
  const [childSurname, setChildSurname] = useState('');
  const [teacher, setTeacher] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [teacherSurname, setTeacherSurname] = useState('');
  const [price, setPrice] = useState(350);
  const [dateLesson, setDateLesson] = useState(null);
  const [timeLesson, setTimeLesson] = useState('');
  const [buttonView, setButtonView] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const source = searchParams.get('source');
  useEffect(() => {
    if (source === 'buttonViewing') {
      setButtonView(false);
    }
  }, [source]);

  useEffect(() => {
    if (lesson) {
      const lessonData = {
        office: lesson.office ? lesson.office : '',
        child: lesson.child ? lesson.child : '',
        childName: lesson.childName ? lesson.childName : '',
        childSurname: lesson.childSurname ? lesson.childSurname : '',
        teacher: lesson.teacher ? lesson.teacher : '',
        teacherName: lesson.teacherName ? lesson.teacherName : '',
        teacherSurname: lesson.teacherSurname ? lesson.teacherSurname : '',
        teacherColor: lesson.teacherColor ? lesson.teacherColor : '',
        price: lesson.price ? lesson.price : 350,
        plan: lesson.plan ? lesson.plan : '',
        review: lesson.review ? lesson.review : '',
        dateLesson: lesson.dateLesson ? lesson.dateLesson : null,
        timeLesson: lesson.timeLesson ? lesson.timeLesson : '',
      };
      setValuesLesson(lessonData);
      setTypeLesson(lessonData.office);
      setChild(lessonData.child);
      setChildName(lessonData.childName);
      setChildSurname(lessonData.childSurname);
      setTeacher(lessonData.teacher);
      setTeacherName(lessonData.teacherName);
      setTeacherSurname(lessonData.teacherSurname);
      setPrice(lessonData.price);
      setDateLesson(lessonData.dateLesson);
      setTimeLesson(lessonData.timeLesson);
    }
  }, [lesson]);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={valuesLesson}
        validationSchema={schemaAddLessonUpdate}
        onSubmit={async values => {
          console.log(values);
          if (buttonView) {
            if (lesson) {
              const id = lesson._id;
              const combinedData = { id, values };
              await dispatch(updateLesson(combinedData)).then(() => {
                navigate('/main');
              });
            } else {
              await dispatch(addLesson(values)).then(() => {
                setAddSuccessLesson(true);
              });
            }
          } else {
            navigate(-1);
          }
        }}
      >
        {({ setFieldValue, errors, touched }) => (
          <FormLesson>
            <TitleForm>Картка заняття</TitleForm>
            <ChoseInfoContainer>
              <FormMainInfo>
                <AddTypeLesson
                  office={typeLesson}
                  setTypeLesson={setTypeLesson}
                  setFieldValue={setFieldValue}
                />
                {touched.office && errors.office && (
                  <ErrorInfo>{errors.office}</ErrorInfo>
                )}
                <AddChildLesson
                  setFieldValue={setFieldValue}
                  addSuccessLesson={addSuccessLesson}
                  child={child}
                  childName={childName}
                  childSurname={childSurname}
                />
                {touched.child && errors.child && (
                  <ErrorInfo>{errors.child}</ErrorInfo>
                )}
                <AddTeacherToLesson
                  setFieldValue={setFieldValue}
                  addSuccessLesson={addSuccessLesson}
                  teacher={teacher}
                  teacherName={teacherName}
                  teacherSurname={teacherSurname}
                />
                {touched.teacher && errors.teacher && (
                  <ErrorInfo>{errors.teacher}</ErrorInfo>
                )}
                <PriceLesson
                  setFieldValue={setFieldValue}
                  currentPrice={price}
                />
              </FormMainInfo>
              <DatePickerLesson
                dateLessonCurrent={dateLesson}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                addSuccessLesson={addSuccessLesson}
                timeLessonCurrent={timeLesson}
              />
            </ChoseInfoContainer>
            <ChoseLessonContainer />
            <TextAreaTitle>План заняття:</TextAreaTitle>
            <FieldTextarea name="plan" component="textarea" rows={6} />
            <TextAreaTitle>Зауваження по заняттю:</TextAreaTitle>
            <FieldTextarea name="review" component="textarea" rows={6} />
            <FormButtonLesson type="submit">
              {buttonView ? 'Зберегти зміни' : 'Назад'}
            </FormButtonLesson>
          </FormLesson>
        )}
      </Formik>
    </>
  );
};

export default AddLesson;