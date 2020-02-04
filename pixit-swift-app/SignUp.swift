//
//  SignUp.swift
//  Pixit Mobile
//
//  Created by Thomas Nelson on 2/1/20.
//  Copyright © 2020 Thomas Nelson. All rights reserved.
//

import UIKit

class SignUp: UIViewController {
    @IBOutlet weak var name: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    @IBAction func resign(_ sender: Any) {
    }
    @IBAction func backSignIn(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
