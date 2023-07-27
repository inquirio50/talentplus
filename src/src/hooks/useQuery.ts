import { useLocation } from 'react-router-dom';
import { getUrlParams } from '../components/helpers/utilityFunctions';

const useQuery = (): URLSearchParams => getUrlParams(useLocation().search);

export default useQuery;
