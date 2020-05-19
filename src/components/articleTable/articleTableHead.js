import React from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';

const ArticleTableHead = ({hideFunctionColumn, ...props}) => {

    const useStyles = makeStyles({
        title: {
          fontWeight: 700,
        }
      });
    
      const classes = useStyles();

    return (
        <TableHead>
            <TableRow>
                <TableCell className={classes.title}>Artikel</TableCell>
                <TableCell className={classes.title} align="right">Anzahl</TableCell>
                <TableCell className={classes.title} align="right">Einheit</TableCell>
                <TableCell className={classes.title} align="right">Preis</TableCell>
                <TableCell className={classes.title} align="right">Rabatt</TableCell>
                <TableCell className={classes.title} align="right">Total</TableCell>
                {hideFunctionColumn? null :<TableCell className={classes.title} align="right">Funktionen</TableCell>}
            </TableRow>
        </TableHead>
    );
}

export default ArticleTableHead;