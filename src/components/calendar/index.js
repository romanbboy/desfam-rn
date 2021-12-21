import React from 'react'
import {Datepicker, TranslationWidth} from "@ui-kitten/components";
import {MomentDateService} from '@ui-kitten/moment';

const dateService = new MomentDateService('ru');

// на мобилке код ниже ломает локаль
dateService.getDayOfWeekNames = function (style = TranslationWidth.SHORT) {
  const days = [...this.localeData.days[style]];
  return days.splice(this.getFirstDayOfWeek()).concat(days)
};

const Calendar = ({date, setDate, min}) => {
  return (
    <Datepicker date={date}
                onSelect={date => setDate(date)}
                min={min}
                size='small'
                backdropStyle={{backgroundColor: 'rgba(0,0,0,.6)'}}
                dateService={dateService} />
  )
}

export default Calendar
