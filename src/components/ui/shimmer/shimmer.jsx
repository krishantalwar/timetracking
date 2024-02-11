import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { Paper } from "@mui/material";


function Media(props) {
  const { loading = false } = props;

  return (
    <Grid container component={Paper} wrap="nowrap" minHeight={'100vh'}>
      {(loading ? Array.from(new Array(4)) : data).map((item, index) => (
        <Box key={index} sx={{ width: 180, marginRight: 10, my: 5 }}>
          {item ? (
            <img
              style={{ width: 260, height: 118 }}
                alt={item.title}
                src={item.src}
            />
          ) : (
            <Skeleton variant="rectangular" width={250} height={118} />
          )}

          {item ? (
            <Box sx={{ pr: 2 }}>
              <Typography display="block" variant="caption" color="text.secondary">
                {item.channel}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {`${item.views} • ${item.createdAt}`}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              {/* <Skeleton /> */}
              {/* <Skeleton width="60%" /> */}
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function Shimmer() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Media loading />
      {/* <Media /> */}
    </Box>
  );
}
