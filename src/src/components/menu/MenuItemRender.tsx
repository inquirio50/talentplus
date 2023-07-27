import React, { useState } from 'react';
import { Box, Button, Collapse, List, ListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { ChevronDown, ChevronRight } from '../icons/Icons';

const styles: any = makeStyles(() => ({
    btnMenu: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '150%',
        borderRadius: 1,
        justifyContent: 'flex-start',
        textAlign: 'left',
        textTransform: 'none',
        width: '100%',
        color: '#FFFFFF',
        '& .MuiButton-startIcon': {
            color: 'rgba(255, 255, 255, 0.56)',
            paddingLeft: 22,
        },
        '&:hover': {
            backgroundColor: '#6A033F',
            fontWeight: 700,
            color: '#FFFFFF',
            '& .MuiButton-startIcon': {
                color: '#FFFFFF',
            },
        },
    },
    gridLogo: {
        paddingLeft: 16,
        paddingBottom: 40,
    },
}));

const ItemBtnMenu = ({ item, t }: { item: any; t: any }) => {
    const css = styles();
    return (
        <ListItem disableGutters>
            <Button
                component="a"
                startIcon={item?.icon || undefined}
                disableRipple
                href={item?.url || ''}
                className={css.btnMenu}>
                {t(item.label)}
            </Button>
        </ListItem>
    );
};

const MenuItemRender = ({ item, path }: { item: any; path: string }) => {
    const { t } = useTranslation();
    const partialMatch = item.path ? path.includes(item.path) : false;
    const [open, setOpen] = useState(!!partialMatch);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <>
            {!item.children && <ItemBtnMenu item={item} t={t} />}
            {item.children && (
                <ListItem
                    disableGutters
                    sx={{
                        display: 'block',
                        mb: 0.5,
                        py: 0,
                        px: 2,
                    }}>
                    <Button
                        endIcon={!open ? <ChevronRight fontSize="small" /> : <ChevronDown fontSize="small" />}
                        disableRipple
                        onClick={handleToggle}
                        startIcon={item.icon}
                        sx={{
                            color: partialMatch ? 'secondary.main' : '#D1D5DB',
                            justifyContent: 'flex-start',
                            pl: '24px',
                            pr: 3,
                            textAlign: 'left',
                            textTransform: 'none',
                            width: '100%',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255, 0.08)',
                            },
                            '& .MuiButton-startIcon': {
                                color: partialMatch ? 'secondary.main' : '#9CA3AF',
                            },
                            '& .MuiButton-endIcon': {
                                color: '#9CA3AF',
                            },
                        }}>
                        <Box sx={{ flexGrow: 1 }}>{t(item.label)}</Box>
                    </Button>
                    <Collapse in={open} sx={{ mt: 0.5 }}>
                        <List disablePadding>
                            {item.children.map((child: any) => (
                                <ItemBtnMenu key={child.key} item={child} t={t} />
                            ))}
                        </List>
                    </Collapse>
                </ListItem>
            )}
        </>
    );
};

export default MenuItemRender;
