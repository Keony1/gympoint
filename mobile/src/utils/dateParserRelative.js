import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';

export default function dateParserRelative(date) {
  return formatRelative(parseISO(date), new Date(), {
    locale: pt,
    addSuffix: true,
  });
}
