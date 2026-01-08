DELIMITER //

DROP PROCEDURE IF EXISTS fn_delete_project //

CREATE PROCEDURE fn_delete_project(IN p_project_id VARCHAR(20))
BEGIN
    -- 1. Dependent Tables (via Subqueries) --
    
    -- Delete pexpense_match (via pexpense_item -> pexpense_list)
    DELETE FROM pexpense_match 
    WHERE pl_seq IN (
        SELECT seq FROM pexpense_item 
        WHERE exp_id IN (SELECT exp_id FROM pexpense_list WHERE project_id = p_project_id)
    );

    -- Delete pexpense_match (via estimate_item -> estimate)
    DELETE FROM pexpense_match 
    WHERE target_seq IN (
        SELECT seq FROM estimate_item 
        WHERE est_id IN (SELECT est_id FROM estimate WHERE project_id = p_project_id)
    );

    -- Delete invoice_item (via invoice_list)
    DELETE FROM invoice_item 
    WHERE il_seq IN (
        SELECT seq FROM invoice_list WHERE project_id = p_project_id
    );

    -- Delete pexpense_item
    DELETE FROM pexpense_item 
    WHERE exp_id IN (SELECT exp_id FROM pexpense_list WHERE project_id = p_project_id);

    -- Delete estimate_item
    DELETE FROM estimate_item 
    WHERE est_id IN (SELECT est_id FROM estimate WHERE project_id = p_project_id);


    -- 2. Direct Dependencies --
    
    DELETE FROM invoice_list WHERE project_id = p_project_id;
    DELETE FROM pexpense_list WHERE project_id = p_project_id;
    DELETE FROM estimate WHERE project_id = p_project_id; -- Added based on usage of estimate table in subqueries
    
    DELETE FROM project_member WHERE project_id = p_project_id;
    DELETE FROM project_log WHERE project_id = p_project_id;
    DELETE FROM project_mark WHERE project_id = p_project_id;
    
    -- 3. Main Project Table --
    DELETE FROM project WHERE project_id = p_project_id;
    
    SELECT 'Success' AS result;
END //

DELIMITER ;
