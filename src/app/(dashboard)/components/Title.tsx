import { useTitle } from "@/app/hooks/useTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";

const Title = () => {
  const { titles, setNewTitle, addToTitles } = useTitle();
  return (
    <div>
      <TextField onChange={(e) => setNewTitle(e.target.value)} required fullWidth id='title' label='Title' name='title' autoComplete='title' />
      <Button disabled={false} onClick={() => addToTitles()} style={{ backgroundColor: "#7c66da", height: 50 }} type='submit' variant='contained' sx={{ mt: 1, mb: 2 }}>
        Add Title
      </Button>
      {titles.map(({ title, uuid, createdAt }) => (
        <div key={uuid}>
          <div>
            {title} - {createdAt}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Title;
