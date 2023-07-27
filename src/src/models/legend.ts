import Category from './category';

export default interface Legend {
    id?: string;
    libelle?: string;
    priorization?: number;
    minIdeal?: number;
    maxIdeal?: number;
    miIdeal?: number;
    poidsMaxIdeal?: number;
    minValue?: number;
    categories?: Category[];
}
