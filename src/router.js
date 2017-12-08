const upload = require('./storage');



module.exports = (app) => {
    
    // Render index.ejs
    app.get('/', (req, res, next) => {
        res.render('index');
    });


    // Upload
    app.post('/upload', (req, res) => {
        
        upload(req, res, (error) => {
            
            // In case of an error:
            if (error) {
                res.render('index', {
                    msg: error
                });
            
            } else {
                if (!req.file) {
                    res.render('index', {
                        msg: 'No file has been selected!'
                    });
                
                } else {
                    res.render('index', {
                        msg: 'File has been uploaded!',
                        file: `uploads/${ req.file.filename }`
                    });
                }
            }

        });

    });

}