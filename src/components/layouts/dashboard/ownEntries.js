import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const GreenCheckbox = withStyles({
  root: {
    paddingLeft: '15px',
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})

((props) => <Checkbox color="default" {...props} />);

export default function OwnEntries() {
  const [state, setState] = React.useState({
    ownEntries: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  return (
      <div>
      <FormGroup row>
        <FormControlLabel
            control={
              <Checkbox
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="ownEntries"
                  color="primary"
              />
            }
            label="Zeige nur eigene Einträge"
        />
      </FormGroup>
      </div>
  );
}