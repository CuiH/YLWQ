/**
 * Created by CuiH on 2017/4/4.
 */

const club = {
	insert: 'INSERT INTO news (author, publish_time, title, content) VALUES (?, NOW(), ?, ?)',
	selectOneById: 'SELECT author, title, content, publish_time, id FROM news WHERE id = ?',
	selectLatestEight: 'SELECT id, title, brief, img_url ' +
	                   'FROM news ' +
	                   'ORDER BY publish_time ' +
	                   'LIMIT 0, 8'
};

module.exports = club;
