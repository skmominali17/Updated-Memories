import { Box } from '@mui/material';


const Footer = () => {
    return (
       <Box
         sx={{
           position: 'fixed', // Make the footer fixed
           bottom: 0, // Position it at the bottom
           left: 0, // Align it to the left
           width: '100%', // Make it take the full width of the viewport
           backgroundColor: '#f5f5f5', // Custom background color
           padding: '16px', // Add some padding
           textAlign: 'center', // Center the text
         }}
       >
         Footer
       </Box>
    );
   };
   
   export default Footer;
   